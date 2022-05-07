import os
import time
import pandas as pd
import streamlit as st
import plotly.express as px

option = st.selectbox(
     'Choose Algorithm',
    ('Selection sort', 'Insertion sort', 'Bubble sort', 'Heap sort','Merge sort' ,'Quick sort'))

if option == 'Selection sort' :
    st.title('Selection Sort')

    # Just to vaoid error ValueError: invalid literal for int() with base 10: ''
    input_data = [1,2,3]

    # Taking input 
    input_data = st.text_input("Enter , separated list of elemets to visvualiaize Selection Sort.",
                                placeholder="1,9,2,8,3,7,4,6,5")
    if input_data:
        elements = list(map(int, input_data.split(",")))
        total_elements = [i for i in range(1,len(elements)+1)]

    if st.button("Visualize"):
        with st.empty():
            # Traverse through all elements elements
            for i in range(len(elements)):
                
                # Find the minimum element in remaining 
                # unsorted elementay
                min_idx = i
                for j in range(i+1, len(elements)):
                    if elements[min_idx] > elements[j]:
                        min_idx = j
                            
                # Swap the found minimum element with 
                # the first element        
                elements[i],elements[min_idx] =elements[min_idx],elements[i]

                # Creating dict
                element_dict = {
                    "Index": total_elements,
                    "data": elements
                }

                # Creating data frame
                df = pd.DataFrame(element_dict)

                fig = px.bar(df, y='data', text_auto=True)
                st.plotly_chart(fig, use_container_width=True, orientation='v')

                time.sleep(5)

                st.balloons()
    else:
        st.success("Waiting for your input")
        
elif option == 'Insertion sort':
    st.title('Insertion Sort')
    
    # Just to vaoid error ValueError: invalid literal for int() with base 10: ''
    input_data = [1,2,3]
    
     # Taking input 
    input_data = st.text_input("Enter , separated list of elemets to visvualiaize Insertion Sort.",
                                placeholder="1,9,2,8,3,7,4,6,5")
    if input_data:
        elements = list(map(int, input_data.split(",")))
        total_elements = [i for i in range(1,len(elements)+1)]

    if st.button("Visualize"):
        with st.empty():
              # loop through each element of elements
            for i in range(len(elements)):
                    
                # keep track of swapping
                swapped = False
                
                # loop to compare elements elements
                for j in range(0, len(elements) - i - 1):

                # compare two adjacent elements
                # change > to < to sort in descending order
                    if elements[j] > elements[j + 1]:

                        # swapping occurs if elements
                        # are not in the intended order
                        temp = elements[j]
                        elements[j] = elements[j+1]
                        elements[j+1] = temp

                        swapped = True
                    
                # no swapping means the elements is already sorted
                # so no need for further comparison
                if not swapped:
                    break
            
                # Creating dict
                element_dict = {
                    "Index": total_elements,
                    "data": elements
                }

                # Creating data frame
                df = pd.DataFrame(element_dict)

                fig = px.bar(df, y='data', text_auto=True)
                st.plotly_chart(fig, use_container_width=True, orientation='v')

                time.sleep(5)

                st.balloons()
    else:
        st.success("Waiting for your input")
             
elif option == 'Bubble sort':
    st.title('Bubble Sort')
    
    # Just to vaoid error ValueError: invalid literal for int() with base 10: ''
    input_data = [1,2,3]
    
     # Taking input 
    input_data = st.text_input("Enter , separated list of elemets to visvualiaize Bubble Sort.",
                                placeholder="1,9,2,8,3,7,4,6,5")
    if input_data:
        elements = list(map(int, input_data.split(",")))
        total_elements = [i for i in range(1,len(elements)+1)]

    if st.button("Visualize"):
        with st.empty():
            # Traverse through all elements elements
            for step in range(1, len(elements)):
                key = elements[step]
                j = step - 1
            
            # Compare key with each element on the left of it until an element smaller than it is found
            # For descending order, change key<elements[j] to key>elements[j].        
                while j >= 0 and key < elements[j]:
                    elements[j + 1] = elements[j]
                    j = j - 1
            
                # Place key at after the element just smaller than it.
                elements[j + 1] = key
            
                # Creating dict
                element_dict = {
                    "Index": total_elements,
                    "data": elements
                }

                # Creating data frame
                df = pd.DataFrame(element_dict)

                fig = px.bar(df, y='data', text_auto=True)
                st.plotly_chart(fig, use_container_width=True, orientation='v')

                time.sleep(1)

                st.balloons()
    else:
        st.success("Waiting for your input")
        
elif option == 'Heap sort':
    st.title('Heap  Sort')
    
    # Just to vaoid error ValueError: invalid literal for int() with base 10: ''
    input_data = [1,2,3]
    
     # Taking input 
    input_data = st.text_input("Enter , separated list of elemets to visvualiaize Heap Sort.",
                                placeholder="1,9,2,8,3,7,4,6,5")
    if input_data:
        elements = list(map(int, input_data.split(",")))
        total_elements = [i for i in range(1,len(elements)+1)]

    if st.button("Visualize"):
        with st.empty():
            # Traverse through all elements elements
            def heapify(elements, n, i):
                
                # Creating dict
                element_dict = {
                    "Index": total_elements,
                    "data": elements
                }

                # Creating data frame
                df = pd.DataFrame(element_dict)

                fig = px.bar(df, y='data', text_auto=True)
                st.plotly_chart(fig, use_container_width=True, orientation='v')
                time.sleep(1)
                
                # Find largest among root and children
                largest = i
                l = 2 * i + 1
                r = 2 * i + 2
            
                if l < n and elements[i] < elements[l]:
                    largest = l
            
                if r < n and elements[largest] < elements[r]:
                    largest = r
            
                # If root is not largest, swap with largest and continue heapifying
                if largest != i:
                    elements[i], elements[largest] = elements[largest], elements[i]
                    heapify(elements, n, largest)
            
            
            def heapSort(elements):
                n = len(elements)
            
                # Build max heap
                for i in range(n//2, -1, -1):
                    heapify(elements, n, i)
            
                for i in range(n-1, 0, -1):
                    # Swap
                    elements[i], elements[0] = elements[0], elements[i]
            
                    # Heapify root element
                    heapify(elements, i, 0)
                    
            heapSort(elements)

            # st.balloons()
    else:
        st.success("Waiting for your input")
               
elif option == 'Merge sort':
    st.title('Merge  Sort')
    
    # Just to vaoid error ValueError: invalid literal for int() with base 10: ''
    input_data = [1,2,3]
    
     # Taking input 
    input_data = st.text_input("Enter , separated list of elemets to visvualiaize Merge Sort.",
                                placeholder="1,9,2,8,3,7,4,6,5")
    if input_data:
        elements = list(map(int, input_data.split(",")))
        total_elements = [i for i in range(1,len(elements)+1)]

    if st.button("Visualize"):
        with st.empty():
            # Traverse through all elements elements
            def mergeSort(elements):
                # start with least partition size of 2^0 = 1
                width = 1   
                n = len(elements)                                         
                # subarray size grows by powers of 2
                # since growth of loop condition is exponential,
                # time consumed is logarithmic (log2n)
                while (width < n):
                    # always start from leftmost
                    l=0;
                    while (l < n):
                        r = min(l+(width*2-1), n-1)        
                        m = min(l+width-1,n-1)
                        # final merge should consider
                        # unmerged sublist if input arr
                        # size is not power of 2             
                        merge(elements, l, m, r)
                        l += width*2
                    # Increasing sub array size by powers of 2
                    width *= 2
                return elements
            
            # Merge Function
            def merge(elements, l, m, r):
                n1 = m - l + 1
                n2 = r - m
                L = [0] * n1
                R = [0] * n2
                for i in range(0, n1):
                    L[i] = elements[l + i]
                for i in range(0, n2):
                    R[i] = elements[m + i + 1]

                i, j, k = 0, 0, l
                while i < n1 and j < n2:
                    if L[i] <= R[j]:
                        elements[k] = L[i]
                        i += 1
                    else:
                        elements[k] = R[j]
                        j += 1
                    k += 1

                while i < n1:
                    elements[k] = L[i]
                    i += 1
                    k += 1

                while j < n2:
                    elements[k] = R[j]
                    j += 1
                    k += 1   
                    
                # Creating dict
                element_dict = {
                    "Index": total_elements,
                    "data": elements
                }

                # Creating data frame
                df = pd.DataFrame(element_dict)

                fig = px.bar(df, y='data', text_auto=True)
                st.plotly_chart(fig, use_container_width=True, orientation='v')
                time.sleep(1)
                        
            mergeSort(elements)
    else:
        st.success("Waiting for your input")
    
elif option == 'Quick sort':
    st.title('Quick Sort')
    
    # Just to vaoid error ValueError: invalid literal for int() with base 10: ''
    input_data = [1,2,3]
    
     # Taking input 
    input_data = st.text_input("Enter , separated list of elemets to visvualiaize Quick Sort.",
                                placeholder="1,9,2,8,3,7,4,6,5")
    if input_data:
        elements = list(map(int, input_data.split(",")))
        total_elements = [i for i in range(1,len(elements)+1)]

    if st.button("Visualize"):
        with st.empty():
              # loop through each element of elements
            for i in range(len(elements)):
                    
                # keep track of swapping
                swapped = False
                
                # loop to compare elements elements
                for j in range(0, len(elements) - i - 1):

                # compare two adjacent elements
                # change > to < to sort in descending order
                    if elements[j] > elements[j + 1]:

                        # swapping occurs if elements
                        # are not in the intended order
                        temp = elements[j]
                        elements[j] = elements[j+1]
                        elements[j+1] = temp

                        swapped = True
                    
                # no swapping means the elements is already sorted
                # so no need for further comparison
                if not swapped:
                    break
            
                # Creating dict
                element_dict = {
                    "Index": total_elements,
                    "data": elements
                }

                # Creating data frame
                df = pd.DataFrame(element_dict)

                fig = px.bar(df, y='data', text_auto=True)
                st.plotly_chart(fig, use_container_width=True, orientation='v')

                time.sleep(1)
    else:
        st.success("Waiting for your input")