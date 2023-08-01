#노드를 깔고
FROM node:alpine 
#경로 설정
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
# 설치좀 하고
RUN npm install --force
#-- force는 react만 해당함
RUN npm install react-scripts@5.0.1 -g
#포트번호
EXPOSE 3000
# 실행 명령어
CMD ["npm", "start"]
#여기서 바꿀 것은 버전 및 포트번호밖에없다.
#package.josn에서 react-scripts 버전 확인하고 작성하기