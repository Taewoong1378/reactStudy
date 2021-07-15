drink1 = input("음료의 종류를 입력하세요: ")
number1=  int(input("해당 음료의 수를 입력하세요: "))
drink2 = input("음료의 종류를 입력하세요: ")
number2=  int(input("해당 음료의 수를 입력하세요: "))
drink3 = input("음료의 종류를 입력하세요: ")
number3=  int(input("해당 음료의 수를 입력하세요: "))
price1 = 0
price2 = 0
price3 = 0
num_a = 0
num_b = 0
num_c = 0

if drink1 == 'a' and number1:
    price1 = 500
    num_a += number1
elif drink1 == 'b' and number1:
    price1 = 800
    num_b += number1
elif drink1 == 'c' and number1:
    price1 = 1000
    num_c += number1

if drink2 == 'a' and number2:
    price2 = 500
    num_a += number2
elif drink2 == 'b' and number2:
    price2 = 800
    num_b += number2
elif drink2 == 'c' and number2:
    price2 = 1000
    num_b += number2

if drink3 == 'a' and number3:
    price3 = 500
    num_a += number3
elif drink3 == 'b' and number3:
    price3 = 800
    num_b += number3
elif drink3 == 'c' and number3:
    price3 = 1000
    num_c += number3



total_price = price1 * number1 + price2 * number2 + price3 * number3

print(num_a, num_b, num_c, total_price)
