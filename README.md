## 部署命令

设置 devops 流水线部署命令，以 root 角色运行

### 云效流水线模板

```shell
TT_WORKDIR=/root/app/bmm/
TT_PACKAGE=bmm-admin.tgz
TT_YML=bmm-admin.yml
TT_NAMESPACE=bmm
TT_DEPLOYMENT=bmm-admin-controller

kubectl get namespace | awk '{print $1}' | grep -q "${TT_NAMESPACE}";if [ $? -eq 0 ]; then echo "exist ns ${TT_NAMESPACE}";else kubectl create namespace ${TT_NAMESPACE};fi
mkdir -p ${TT_WORKDIR}temp
tar -zxvf ${TT_WORKDIR}${TT_PACKAGE} -C ${TT_WORKDIR}temp
mv -f ${TT_WORKDIR}temp/${TT_YML}  ${TT_WORKDIR}
cd ${TT_WORKDIR}
kubectl get deployment -n ${TT_NAMESPACE} | awk '{print $1}'| grep -q "${TT_DEPLOYMENT}";if [ $? -eq 0 ]; then kubectl apply -f ${TT_YML} && sleep 10 && kubectl rollout restart deployment ${TT_DEPLOYMENT} -n ${TT_NAMESPACE};else kubectl apply -f ${TT_YML};fi
rm -rf ${TT_WORKDIR}temp
rm -rf ${TT_WORKDIR}${TT_PACKAGE}
```
