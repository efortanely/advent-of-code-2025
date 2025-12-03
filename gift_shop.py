def puzzle_1(input):
    invalid_sum = 0

    for id_range in input.split(","):
        first, last = id_range.split("-")
        first = int(first)
        last = int(last)

        for num in range(first, last + 1):
            num = str(num)

            if not len(num) % 2 and num[:len(num) // 2] == num[len(num) // 2:]:
                invalid_sum += int(num)

    return invalid_sum

def puzzle_2(input):
    invalid_sum = 0

    for id_range in input.split(","):
        first, last = id_range.split("-")
        first = int(first)
        last = int(last)

        for num in range(first, last + 1):
            num = str(num)
            n = len(num)

            for i in range(1, n // 2 + 1):
                if n % i:
                    continue

                if num.count(num[:i]) == n // i:
                    invalid_sum += int(num)
                    break

    return invalid_sum

if __name__ == "__main__":
    input = "16100064-16192119,2117697596-2117933551,1-21,9999936269-10000072423,1770-2452,389429-427594,46633-66991,877764826-877930156,880869-991984,18943-26512,7216-9427,825-1162,581490-647864,2736-3909,39327886-39455605,430759-454012,1178-1741,219779-244138,77641-97923,1975994465-1976192503,3486612-3602532,277-378,418-690,74704280-74781349,3915-5717,665312-740273,69386294-69487574,2176846-2268755,26-45,372340114-372408052,7996502103-7996658803,7762107-7787125,48-64,4432420-4462711,130854-178173,87-115,244511-360206,69-86"
    print(puzzle_1(input))
    print(puzzle_2(input))