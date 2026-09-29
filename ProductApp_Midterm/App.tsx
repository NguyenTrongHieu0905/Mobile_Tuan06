import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, RefreshControl, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ProductCard, { Product } from './components/ProductCard';

type DummyProduct = { id:number; title:string; category:string; price:number; rating:number; thumbnail:string; stock:number };
type DummyResponse = { products: DummyProduct[] };
const API_URL = 'https://dummyjson.com/products?limit=12';

export default function App() {
  const [products,setProducts]=useState<Product[]>([]);
  const [loading,setLoading]=useState(true);
  const [refreshing,setRefreshing]=useState(false);
  const [isTile,setIsTile]=useState(false);
  const [onlyInStock,setOnlyInStock]=useState(false);
  const [error,setError]=useState('');

  const loadProducts=useCallback(async()=>{
    try{
      setError('');
      const response=await fetch(API_URL);
      if(!response.ok) throw new Error('Không tải được dữ liệu');
      const json:DummyResponse=await response.json();
      setProducts(json.products.map(item=>({
        id:String(item.id), name:item.title, category:item.category, price:item.price,
        rating:Math.min(10,item.rating*2), image:item.thumbnail, inStock:item.stock>0,
      })));
    }catch(e){ setError(e instanceof Error ? e.message : 'Có lỗi xảy ra'); }
  },[]);

  useEffect(()=>{ (async()=>{setLoading(true); await loadProducts(); setLoading(false)})(); },[loadProducts]);
  const onRefresh=useCallback(async()=>{setRefreshing(true); await loadProducts(); setRefreshing(false)},[loadProducts]);
  const onSelect=useCallback((id:string)=>{const p=products.find(x=>x.id===id); if(p) Alert.alert(p.name)},[products]);
  const displayedProducts=useMemo(()=>products.filter(p=>!onlyInStock||p.inStock),[products,onlyInStock]);
  const numColumns=isTile?2:1;

  return <SafeAreaProvider><SafeAreaView style={styles.safeArea}><View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Product App</Text>
      <View style={styles.switchRow}><Text style={styles.switchLabel}>Dạng lưới</Text><Switch value={isTile} onValueChange={setIsTile}/></View>
      <View style={styles.switchRow}><Text style={styles.switchLabel}>Chỉ còn hàng</Text><Switch value={onlyInStock} onValueChange={setOnlyInStock}/></View>
    </View>
    {loading ? <View style={styles.center}><ActivityIndicator size="large"/><Text>Đang tải sản phẩm...</Text></View>
    : error ? <View style={styles.center}><Text style={styles.error}>{error}</Text><Text>Kéo xuống để thử tải lại.</Text></View>
    : <FlatList key={String(numColumns)} data={displayedProducts} keyExtractor={item=>item.id}
        numColumns={numColumns} renderItem={({item})=><ProductCard product={item} layout={isTile?'tile':'row'} onSelect={onSelect}/>} 
        contentContainerStyle={styles.list} columnWrapperStyle={numColumns===2?styles.columnWrapper:undefined}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} 
        ListEmptyComponent={<View style={styles.center}><Text>Không có sản phẩm phù hợp.</Text></View>}/>} 
  </View></SafeAreaView></SafeAreaProvider>;
}

const styles=StyleSheet.create({
  safeArea:{flex:1,backgroundColor:'#f3f4f6'},container:{flex:1},header:{paddingHorizontal:16,paddingVertical:12,backgroundColor:'#fff',gap:8},
  title:{fontSize:26,fontWeight:'800',color:'#111827',marginBottom:2},switchRow:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  switchLabel:{fontSize:15,fontWeight:'600'},list:{padding:16,paddingBottom:28},columnWrapper:{justifyContent:'space-between'},
  center:{flex:1,minHeight:220,alignItems:'center',justifyContent:'center',gap:8,padding:16},error:{color:'#b91c1c',fontWeight:'700'}
});
