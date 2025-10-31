# 66010497 Nodejs Expressjs API

API นี้มีไว้สำหรับเข้าถึงและจัดการข้อมูลที่เกี่ยวข้องกับโดรน โดยจะมีการเรียกข้อมูลจากเซิร์ฟเวอร์ข้อมูล 2 แห่ง คือ **Server1 (Drone Config Server)** สำหรับข้อมูลการตั้งค่าและสถานะ และ **Server2 (Drone Log Server)** สำหรับข้อมูลบันทึก (Logs)

---

## 🔗 HTTP Methods

| HTTP Method | Path | คำอธิบายโดยย่อ | ใช้ Server |
| :--- | :--- | :--- | :--- |
| **GET** | `/configs/{droneId}` | ดึงข้อมูลการตั้งค่าเฉพาะของโดรนตาม `droneId` | Server1 (Drone Config Server) |
| **GET** | `/status/{droneId}` | ดึงข้อมูลสถานะเฉพาะของโดรนตาม `droneId` | Server1 (Drone Config Server) |
| **GET** | `/logs/{droneId}` | ดึงรายการบันทึก (logs) ของโดรนตาม `droneId` (จำกัด 12 รายการล่าสุด) | Server2 (Drone Log Server) |
| **POST** | `/logs` | สร้างรายการบันทึก (log record) ใหม่ในระบบ | Server2 (Drone Log Server) |

---

## ⚙️ รายละเอียด Endpoints

### 1. GET /configs/{droneId}

* **คำอธิบาย:** ดึงข้อมูลการกำหนดค่าเฉพาะสำหรับโดรนที่ระบุด้วย `droneId`
* **Input Parameter (Path):**
    * `droneId` (Integer): ID ของโดรนที่ต้องการข้อมูล
* **การทำงาน:**
    1.  รับค่า `droneId` จาก Path Parameter
    2.  ส่งคำขอ **GET** ไปยัง **Server1 (Drone Config Server)**
    3.  ส่งคืนข้อมูลการกำหนดค่าเฉพาะของโดรนนั้นในรูปแบบ JSON
* **ข้อมูลที่ส่งคืน (Response Fields):** `drone_id`, `drone_name`, `light`, `country`, `weight`
* **ตัวอย่าง Response (Status: 200 OK):**
    ```json
    {
      "drone_id": 3001,
      "drone_name": "Dot Dot",
      "light": "on",
      "country": "India",
      "weight": 21
    }
    ```

### 2. GET /status/{droneId}

* **คำอธิบาย:** ดึงข้อมูลสถานะ (condition) เฉพาะสำหรับโดรนที่ระบุด้วย `droneId`
* **Input Parameter (Path):**
    * `droneId` (Integer): ID ของโดรนที่ต้องการข้อมูล
* **การทำงาน:**
    1.  รับค่า `droneId` จาก Path Parameter
    2.  ส่งคำขอ **GET** ไปยัง **Server1 (Drone Config Server)**
    3.  ส่งคืนข้อมูลสถานะ (condition) ของโดรนนั้นในรูปแบบ JSON
* **ข้อมูลที่ส่งคืน (Response Fields):** `condition`
* **ตัวอย่าง Response (Status: 200 OK):**
    ```json
    {
      "condition": "good"
    }
    ```

### 3. GET /logs/{droneId}

* **คำอธิบาย:** ดึงรายการบันทึก (Logs) ล่าสุดของโดรนที่ระบุด้วย `droneId`
* **Input Parameter (Path):**
    * `droneId` (Integer): ID ของโดรนที่ต้องการข้อมูล Log
* **การทำงาน:**
    1.  รับค่า `droneId` จาก Path Parameter
    2.  ส่งคำขอ **GET** ไปยัง **Server2 (Drone Log Server)**
    3.  Server2 จะส่งคืน **JSON Array** ของ Log Records
    4.  ข้อมูลจะต้องถูกเรียงตามฟิลด์ `created` ล่าสุดขึ้นก่อน และจำกัดจำนวนผลลัพธ์ที่ **12 รายการ**
* **ข้อมูลที่ส่งคืน (Response Fields ในแต่ละ Log Record):** `drone_id`, `drone_name`, `created`, `country`, `celsius`
* **ตัวอย่าง Response (Status: 200 OK):**
    ```json
    [
      {
        "drone_id": 3001,
        "drone_name": "Dot Dot",
        "created": "2024-09-22 07:37:32.111Z",
        "country": "India",
        "celsius": 45
      },
      {
        "drone_id": 3001,
        "drone_name": "Dot Dot",
        "created": "2024-09-22 07:37:57.411Z",
        "country": "India",
        "celsius": 46
      }
    ]
    ```

### 4. POST /logs

* **คำอธิบาย:** สร้างรายการบันทึก (Log Record) ใหม่ในระบบ
* **Input Parameter (Request Body):** JSON Object ที่มีข้อมูล Log ที่ต้องการสร้าง
* **การทำงาน:**
    1.  รับข้อมูล JSON จาก Request Body
    2.  ส่งข้อมูลที่จำเป็นไปยัง **Server2 (Drone Log Server)** เพื่อสร้าง Log Record ใหม่
* **ข้อมูลที่ส่งไปยัง Server2 (Required Fields in Request Body):** `drone_id`, `drone_name`, `country`, `celsius`
* **ตัวอย่าง Request Body:**
    ```json
    {
      "drone_id": 3001,
      "drone_name": "Dot Dot",
      "country": "India",
      "celsius": 47
    }
    ```
* **ตัวอย่าง Response (Status: 201 Created)**: *(อาจส่งคืน Log Record ที่สร้างขึ้นพร้อม Timestamp หรือ ID)*

---