## 케이스 주제

Q. 구글에서 개발한 frontend framework인 angular로 web application을 구현해보자.

Q. root로 '/' 로 접속하면 로그인 화면이 나온다. localhost:4200/home/rupy로 접속했을 때 메인 화면이 나오도록 코드를 완성하자.

## 문제

q1. url path가 home/{userNickName}로 접속하면 main page component를 출력하도록 완성 하시오.

q2. main page에서 user정보가 없다면 login 화면으로 이동하도록 완성 하시오.

q3. backend interceptor에 user 정보를 가져오도록 완성 하시오.

q4. http 모듈을 이용하여 user 정보를 호출하는 api를 feed-api.service.ts에 완성하시오.

q5. main page controller 인 main.service.ts에 subject를 이용하여 main data를 가져올 수 있는 hot observable을 구현하시오.

q6. login 여부를 체크하기 위해서 user정보를 멀티캐스트로 방출하는 컨트롤러를 작성하시오.

## 기능요구사항 및 기획

![image](https://user-images.githubusercontent.com/12759765/115124670-5d414400-9ffe-11eb-8854-cc297ecb2969.png)
<br>
<hr>
<br>

## 기획의도
* 개발과 관련된 공부를 하고난 뒤 인증용 SNS 입니다. 개발자 특화 인스타그램 같은 느낌이죠.

<br>

## 마크업 구조 IA
![IA](https://user-images.githubusercontent.com/12759765/115263162-268b3b00-a170-11eb-87d4-494f9f6683d9.png)

<br>

## 페이지
### [전체피드]
* 홈 화면입니다.
* 모바일에서는 피드 아이템들만 보이고, 피시에서는 오른쪽에 프로필이 sticky 요소로 따라다닙니다.
* 하단에 페이지네이션을 통해 게시물을 더 볼 수 있습니다. (무한로딩으로 바뀌어도 무방)
* ![전체피드](https://user-images.githubusercontent.com/12759765/115124696-819d2080-9ffe-11eb-9cb2-701e066d8d20.png)


### [마이피드]
* 본인의 게시물을 모아서 볼 수 있는 페이지입니다.
* 하단에 페이지네이션을 통해 게시물을 더 볼 수 있습니다. (무한로딩으로 바뀌어도 무방)
* ![마이피드](https://user-images.githubusercontent.com/12759765/115124699-85c93e00-9ffe-11eb-936b-598f784d1380.png)
* ![image](https://user-images.githubusercontent.com/12759765/115124790-21f34500-9fff-11eb-9283-af4f0a824c03.png)


### [검색]
* 태그 기반 검색 결과를 확인할 수 있습니다.
* 검색어를 입력하고 엔터를 누르면 검색이 됩니다.
* 팔로잉 기능이 없기 때문에 유저 검색은 제외했습니다.
* 검색 결과가 없을 경우 '검색 결과가 없습니다' 문구가 노출됩니다.
* ![검색](https://user-images.githubusercontent.com/12759765/115124703-895cc500-9ffe-11eb-8774-288fa5b66f8c.png)


### [업로드 페이지]
- GNB [업로드(연필)] 버튼을 누르면 모달이 뜹니다.
- 단일 사진 업로드와 문구를 작성할 수 있습니다.
- ![업로드](https://user-images.githubusercontent.com/12759765/115124705-8c57b580-9ffe-11eb-9c64-41a5d3562efc.png)


### [로그인], [회원가입]
* 비로그인시에 NAV 에서 메뉴를 확인할 수 있습니다.
* ![로그인](https://user-images.githubusercontent.com/12759765/115124757-ed7f8900-9ffe-11eb-95b7-02eae42d78a6.png)
* ![회원가입](https://user-images.githubusercontent.com/12759765/115124758-f07a7980-9ffe-11eb-97e7-ad037bc3db26.png)


<br>

## 컴포넌트 
### [메뉴바] 
- 로고 : 전체피드(리스트형)
- 비로그인 시 : 로그인, 회원가입
- ![비로그인](https://user-images.githubusercontent.com/12759765/115124858-82828200-9fff-11eb-976a-95e4966fb75c.png)
- 로그인 시  : 검색(돋보기), 작성(연필), 유저이미지(마이피드)
- ![로그인](https://user-images.githubusercontent.com/12759765/115124852-75fe2980-9fff-11eb-82f9-6be44542d736.png)


### [프로필]
- 유저 이미지 (선택) : 기본이미지 제공
- 유저 닉네임 (필수)
- 유저 소개글 (선택)
- 게시글 : 업로드한 총 게시글 개수
- 열정지수
  - `열정지수` = `총 게시물 * 10` + `총 좋아요 개수*10` 입니다.<br>
  ex) `열정지수 200` = `3*10` + `17*10`
- 관심사 : 게시물에 달아놓은 태그 개수
- 태그목록
  - 이중 가장 많이 달아놓은 최상위 2개는 `.primary` 클래스 붙음
  - 태그 누르면 태그 기반 검색 결과 페이지로 이동
- ![image](https://user-images.githubusercontent.com/12759765/115124846-6e3e8500-9fff-11eb-93c3-248b91948997.png)


### [게시글 모달]
- 검색 페이지나, 마이 피드의 섬네일 뷰에서 사진을 클릭하면 모달로 내용이 뜹니다.
- dimmed 영역이나 x 버튼을 클릭하면 모달이 닫힙니다.
- ![image](https://user-images.githubusercontent.com/12759765/115124800-2a4b8000-9fff-11eb-98ff-fc61003e1cce.png)



## Angular Base Folder (angular project 생성시 자동으로 생성되는 폴더 구조 입니다.)
- /app
  - /assets
  - /environments


## 참고사항
- /app
  - /assets
      - /config (최초 application 로딩 전에 설정 정보를 가져오기 위한 json파일 폴더)


## User Folder
- /common (공통 모듈을 정의하는 폴더)
  - /backend (백엔드와 관련된 모듈)
  - /components (공통 ui component)
  - /error (error 처리 관련 모듈)
  - /mappers (backend와 통신 후 frontend type으로 변환하는 mapper 함수)
  - /models (frontend 에서 사용되는 model)
  - /modules (공통으로 사용하는 모듈을 한번에 정의)
  - /services (비지니스 로직을 정의하는 service 모듈 및 ui component controller)
  - /utils (각종 구현에 필요한 util성 함수)
- /dialogs
- /pages (routing 되는 page module 폴더)


## User Component create command

Run `ng generate component common/components/{componentName}`

## User Page Module create command

Run `ng generate module pages/{pageName} --routing=true && ng g component pages/{pageName} -m={pageName}`

## Install Angular Material (Optional)

Run `ng add @angular/material`


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
