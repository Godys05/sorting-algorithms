def bubbleSort(arr): 
    n = len(arr) 
    i = 0
    j = 0
    # Traverse through all array elements 
    while True: 
        # Last i elements are already in place 
        while True: 
            print('i: '+str(i))
            print('j: '+str(j))
            # traverse the array from 0 to n-i-1 
            # Swap if the element found is greater 
            # than the next element 
            if arr[j] > arr[j+1] : 
                arr[j], arr[j+1] = arr[j+1], arr[j]
            j+=1
            if (j >= n-i-1): break
        j = 0
        i += 1
        if (i >= n): break

arr = [64, 34, 25, 12, 22, 11, 90] 
  
bubbleSort(arr)