<template>
  <section>
    <div class="add-card">
      <p class="title">
        已添加的卡片<span>点击删除</span>
      </p>
      <div class="add-list">
        <ul>
          <li v-for="(item,index) in addedListData" @click="addCard(item,0)">
            <img :src="item.iconData" alt="">
            <p class="name">{{item.name}}</p>
          </li>
          <div class="tip" v-if='addListDataShow'>
            <p>暂时没有数据！</p>
          </div>
        </ul>
      </div>
    </div>

    <div class="add-card">
      <p class="title">
        未添加的卡片<span>点击添加</span>
      </p>
      <div class="add-list">
        <ul>
          <li v-for="(item,index) in addListData" @click="addCard(item,1)">
            <img :src="item.iconData" alt="">
            <p class="name">{{item.name}}</p>
          </li>
          <div class="tip" v-if='addedListDataShow'>
            <p>暂时没有数据！</p>
          </div>
        </ul>
      </div>

    </div>

  </section>
</template>
<script>
  export default {
    data() {
      return {
        addedListDataShow: false,
        addListDataShow: false,
        orderCardIds: [],
        addedListData: [],
        addListData: [],
        openToken: 'djZjamRkZ28k9CEmiA4Fh1k4ZU4-ob8wfUxNjZZ4pKdIrb6Wh4sa6ro9AdaU2oz6rV0HjE_VALn6Zx3Ak9sobIX_Ya31ozQ7tud2Ssr2u6uegM7eQtmyir07UjH3cE0TDqUBdbsWjvi3x3_6b0cJspbJuad2LXaSxqoSfEd5dmg'
      }
    },
    mounted() {
      this.addedList()
      this.addList()
    },
    methods: {
      //已添加的卡片数据
      addedList() {
        let formData = {
          oid: '107',
          eid: '97993052-620f-45e2-bdb6-b25aa20c8044',
          personId: '24afe2b5-ebc5-11e8-8754-005056a20dfc'
        }
        this.$http({
          url: 'http://cloud2.nbport.com.cn:81/cloudwork/cardinfo/getAddedCardInfoListByOid.json',

          method: 'post',
          data: formData,
          contentType: 'application/json',
          headers: {

            'openToken': this.openToken
          }
        }).then(res => {
          this.addedListData = res.data.data
          console.log(this.addedListData)
          if (this.addedListData.length > 0) {
            this.addedListData = true;
          }
          for (var i = 0; i < this.addedListData.length; i++) {
            this.orderCardIds.push(this.addedListData[i].id)
          }
        })
      },
      //未被添加卡片的数据
      addList() {
        let formData = {
          oid: '107',
          eid: '97993052-620f-45e2-bdb6-b25aa20c8044',
          personId: '24afe2b5-ebc5-11e8-8754-005056a20dfc'
        }
        this.$http({
          url: 'http://cloud2.nbport.com.cn:81/cloudwork/cardinfo/getNotAddedCardInfoListByOid.json',
          method: 'post',
          data: formData,
          contentType: 'application/json',
          headers: {
            'openToken': this.openToken
          }
        }).then(res => {
          this.addListData = res.data.data
          if (this.addListData.length > 0) {
            this.addListDataShow = true;
          }
          console.log(res.data.data)
        })
      },
      addCard(item, status) {
        console.log(item)
        if (status == 0) {
          this.orderCardIds.splice(item.id)
        } else {
          this.orderCardIds.push(item.id)
        }

        let formData = {
          orderCardIds: this.orderCardIds + '',
        }
        this.$http({
          url: 'http://cloud2.nbport.com.cn:81/cloudwork/cardinfo/orderCardIdsByOid.json',
          method: 'post',
          data: {formData},
          headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'openToken': this.openToken
          }
        }).then(res => {

          console.log(res)
          if (res.data.success) {
            this.addedList()
            this.addList()
          }
        })

      }
    },

  }

</script>
<style>
  body,
  ol,
  ul,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  th,
  td,
  dl,
  dd,
  form,
  fieldset,
  legend,
  input,
  textarea,
  select {
    margin: 0;
    padding: 0
  }

  body {
    font: 16px"宋体", "Arial Narrow", HELVETICA;
    background: #fff;
    -webkit-text-size-adjust: 100%;
  }

  a {
    color: #2d374b;
    text-decoration: none
  }

  a:hover {
    color: #cd0200;
    text-decoration: underline
  }

  em {
    font-style: normal
  }

  li {
    list-style: none
  }

  img {
    border: 0;
    vertical-align: middle;
    width: 3.15rem
  }

  table {
    border-collapse: collapse;
    border-spacing: 0
  }

  p {
    word-wrap: break-word
  }

  section {
    width: 90%;
    margin: 0 auto;
    text-align: left;
    padding-top:10px;
  }

  .add-card .title {
    color: #505050
  }

  .add-card .title span {
    color: #d1d1d1;
    font-size: 14px;

  }

  .add-list ul {
    display: flex;
  }

  .add-list ul li {
    margin-top:10px;
    width:4rem;
    padding: .8rem;
    border-radius: 5px;
    margin-right: 1rem;
    background: #fafafa;
    text-align: center;
  }

  .add-list ul .tip {
    color: #d1d1d1;
    height: 80px;

  }

  .add-list ul .tip {
    vertical-align: -webkit-baseline-middle;
    display: table-cell;
    text-align: center;
    font-size: 14px;
    line-height: 80px;
  }
  .add-list ul .name {
    font-size: 14px;
    margin-top:5px;
  }
</style>
