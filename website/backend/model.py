import tensorflow as tf
import numpy as np
import cv2
#from  matplotlib import pyplot as plt

class Model:

    def __init__(self,model_path,output_path):
        self.model = tf.keras.models.load_model(model_path)
        self.output_path = output_path
        

    def predict(self,path,name):
        img = cv2.imread(path, cv2.IMREAD_COLOR)
        original_image = img
        h, w, _ = img.shape
        img = cv2.resize(img, (256, 256))
        img = img/255.0
        img = img.astype(np.float32)
        img = np.expand_dims(img, axis=0)
        pred_mask = self.model.predict(img)[0]
        pred_mask = np.concatenate(
        [
            pred_mask,
            pred_mask,
            pred_mask
        ], axis=2)

        pred_mask = (pred_mask < 0.5) * 255
        pred_mask = pred_mask.astype(np.uint8)
        pred_mask = cv2.resize(pred_mask, (w, h))
        
        processed_img = cv2.subtract(original_image, pred_mask)

        color = (0,0,0)
        mask = np.where((processed_img==color).all(axis=2), 0, 255).astype(np.uint8)

        processed_img = cv2.cvtColor(processed_img, cv2.COLOR_BGR2BGRA)
        processed_img[:, :, 3] = mask

        #plt.imshow(processed_img )
        #plt.axis('off')
        #plt.show()

        output_path = f'{self.output_path}/{name}.png'
        cv2.imwrite(output_path, processed_img)
        lower = (0,0,0,0)
        upper = (0,0,0,0)
        mask = cv2.inRange(processed_img, lower, upper)
        # count non-zero pixels in mask
        count=np.count_nonzero(mask)
        total = len(processed_img)*len(processed_img[0])
        coverage = (total-count) / total
        return coverage


if __name__ == "__main__":
    model = Model("./model/unet.h5",'./output')
    model.predict('./trump.jpg','trump')
