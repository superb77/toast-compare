# 토스트 라이브러리 비교

<br/>

## [react hot toast](https://react-hot-toast.com/docs)
---
### 1. 디자인 커스텀(위치 조절, 토스트 지우기) 용이

토스트 생성을 위해서는 사용할 만한 것은 [toast()](https://react-hot-toast.com/docs/toast)와 [useToaster()](https://react-hot-toast.com/docs/use-toaster)가 있는 것으로 보입니다. 

- **[toast](https://react-hot-toast.com/docs/toast)**
    
    가장 기본적으로 토스트를 생성할 수 있는 방법입니다. 
    
    ```jsx
    const onClick = () => toast('Wow so easy !');
    ```
    
    `toast` 함수에 두 번째 인자로 추가 옵션을 넣을 수 있습니다.
    
    ```jsx
    toast('Hello World', {
      duration: 4000,
      position: 'top-center',
    
      // Styling
      style: {},
      className: '',
    
      // Custom Icon
      icon: '👏',
    
      // Change colors of success/error/loading icon
      iconTheme: {
        primary: '#000',
        secondary: '#fff',
      },
    
      // Aria
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
    ```
    
    - **삭제**
        
        토스트를 삭제 하기 위해서는 아래 두 개 방법을 제공합니다.
        
        - `toast.remove`
            
            ```jsx
            toast.dismiss();
            ```
            
            dismiss의 경우 모든 토스트를 삭제하는 것으로 보이지만, 여러 토스트가 있을 때 각각 시간차가 존재하는 것으로 보이며, 삭제될 때 애니메이션이 추가됩니다.
            
        - `toast.dismiss`
            
            ```jsx
            toast.remove(toastId); // 특정 ID를 가지고 있는 토스트 삭제
            
            // or
            
            toast.remove(); // 전체 토스트 삭제
            ```
            
            remove의 경우 dismiss와 동일합니다. 하지만, 삭제시 애니메이션이 없이 삭제되며 dismiss에서 발견되었던 시간차가 존재하지 않고 1개만 쌓이는 것 처럼 보입니다.
            
        
        따라서 스택되지 않아야 하는 경우 아래와 같이 사용될 수 있을 것 같습니다.
        
        ```jsx
        const onClick = () => { 
          toast.remove(); 
          
          // 토스트 아이디를 반환합니다.
          toast('Wow so easy !', {
            duration: 1000,
            icon: '🦄',
          });
        }
        ```
        
    - **디자인 커스텀**
        
        `toast` 내에 콜백을 넣어 커스텀 할 수 있는 것으로 보입니다.
        
        ```jsx
        // custom with default style
        toast(
          (t) => (
            <span>
              Custom and <b>bold</b>
              <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
            </span>
          ),
          {
            icon: <Icon />,
          }
        );
        
        // custom without default style
        toast.custom(
          (t) => (
            <div
              className="rounded-md bg-white shadow-lg p-4"
              // style={} 스타일도 따로 지정 가능
            >
              <p className="font-bold">Custom Toast</p>
              <p className="text-sm">With some description</p>
              <button className="text-blue-300" onClick={() => toast.remove(t.id)}>Dismiss</button>
            </div>
          ),
          {
            duration: 1000,
            position: position,
            icon: '🦄',
          }
        );
        ```
        
        따라서, 저희가 사용하는 tailwindCSS 사용에 용이하다 생각합니다.
        
- **[useToaster](https://react-hot-toast.com/docs/use-toaster)**
    
    useToaster의 경우 headless 시스템을 제공하고, 이를 통해 알림 시스템을 쉽게 구축 할 수 있다고 합니다.
    
    - toast()를 사용하여 빌트인 디스패치 시스템 제공
    - 토스트에 호버시 일시중지 기능 제공
    - 만료된 토스트에 대해서 자동 삭제
    
    ```jsx
    import { useToaster } from 'react-hot-toast/headless';
    
    const Notifications = () => {
      const { toasts, handlers } = useToaster();
      const { startPause, endPause, calculateOffset, updateHeight } = handlers;
    
      return (
        <div
          style={{
            position: 'fixed',
            top: 8,
            left: 8,
          }}
          onMouseEnter={startPause}
          onMouseLeave={endPause}
        >
          {toasts.map((toast) => {
            const offset = calculateOffset(toast, {
              reverseOrder: false,
              gutter: 8,
            });
    
            const ref = (el) => {
              if (el && typeof toast.height !== "number") {
                const height = el.getBoundingClientRect().height;
                updateHeight(toast.id, height);
              }
            };
            return (
              <div
                key={toast.id}
                ref={ref}
                style={{
                  position: 'absolute',
                  width: '200px',
                  background: 'papayawhip',
                  transition: 'all 0.5s ease-out',
                  opacity: toast.visible ? 1 : 0,
                  transform: `translateY(${offset}px)`,
                }}
                {...toast.ariaProps}
              >
                {toast.message}
              </div>
            );
          })}
        </div>
      );
    };
    ```
    
    `useToaster` 는 toasts라는 토스트 목록과 추가 부가 기능을 위한 handlers를 반환합니다.
    

### 2. 데이터 식별자 사용 여부

기본적으로 `toast()` 가 반환하는 것은 해당 토스트의 Id로 보입니다.

```jsx
toast(
	message: Message, 
	opts?: Partial<Pick<Toast, "id" | "icon" | "duration" | "ariaProps" | "className" | "style" | "position" | "iconTheme">> | undefined
): string // string 타입의 ID를 반환합니다.
```

<br/>


## [react-toastify](https://fkhadra.github.io/react-toastify/introduction)
---
### 1. 디자인 커스텀(위치 조절, 토스트 지우기) 용이

사용성은 `react-hot-toast` 와 거의 동일하다고 생각합니다. 이도 같이 `toast` 라는 함수를 호출하여 토스트를 생성할 수 있습니다.

```tsx
type Position = "top-right" | "top-center"| "top-left" | "bottom-right"|  "bottom-center" | "bottom-left";

...

const onClick = () => {
  toast("Custom Toast", {
    position: getPosition(),
    draggable: true, // 드래그 해서 삭제
    autoClose: 3000, // 3초 후 자동으로 닫힘
    closeOnClick: true, // 클릭 시 닫힘
  });
}
```

- **삭제**
    
    ```tsx
    import React from 'react';
    import { toast } from 'react-toastify';
    
    function Example(){
      const toastId = React.useRef(null);
    
      const notify = () => toastId.current = toast("Lorem ipsum dolor");
    
      const dismiss = () =>  toast.dismiss(toastId.current);
    
      const dismissAll = () =>  toast.dismiss();
    
      return (
        <div>
          <button onClick={notify}>Notify</button>
          <button onClick={dismiss}>Dismiss</button>
          <button onClick={dismissAll}>Dismiss All</button>
        </div>
      );
    ```
    
    - `dismiss(id)`  → 특정 토스트를 삭제합니다.
    - `dismiss()` → 전체 토스트를 삭제합니다.
- **디자인 커스텀**
    
    우선 toastify의 스타일을 사용하기 위해서는 라이브러리 자체 CSS를 `import` 해와야 합니다.
    
    ```tsx
    import "react-toastify/dist/ReactToastify.css";
    ```
    
    따라서, 우리가 원하는 스타일에 맞게 수정하기 위해서는 해당 폴더에 들어가서 CSS를 직접 수정해야 하는 것으로 보입니다. 자세한 것은 [공식문서](https://fkhadra.github.io/react-toastify/how-to-style)에 나와 있습니다.
    

### 2. 데이터 식별자 사용 여부

이 또한 `toast()` 가 해당 토스트의 Id를 반환합니다.

```tsx
toast<unknown>(
	content: ToastContent<unknown>, 
	options?: ToastOptions<{}> | undefined
): Id // 토스트의 Id를 반환합니다. string | number
```

<br/>


## 용량
---

![스크린샷 2022-12-27 오후 5.22.47.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d198513a-f9e2-4384-9237-659efde73712/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-27_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.22.47.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221227T082739Z&X-Amz-Expires=86400&X-Amz-Signature=42b7db0aa9ec5665353f2da48bf469ad6e50dd1393f0018392dc1da78df3174d&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA%25202022-12-27%2520%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE%25205.22.47.png%22&x-id=GetObject)

- react-hot-toast : 4.8KB
- react-toastify : 6.3KB

<br/>


## 사용량
---

![스크린샷 2022-12-27 오후 5.24.47.png](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b739641c-218f-4959-8663-2cf442797b0e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-27_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.24.47.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221227T082753Z&X-Amz-Expires=86400&X-Amz-Signature=a51d635c8ac34d9b49c1d3a6ac3686c17c90ba24bd937f21fddafb00812506f8&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA%25202022-12-27%2520%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE%25205.24.47.png%22&x-id=GetObject)

사용량의 경우 `react-toastify`가 압도적으로 많은 것을 볼 수 있습니다.