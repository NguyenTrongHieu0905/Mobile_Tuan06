import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  inStock: boolean;
};

export type ProductCardProps = {
  product: Product;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
};

function ProductCard({ product, layout = 'row', onSelect }: ProductCardProps) {
  const isTile = layout === 'tile';
  return (
    <TouchableOpacity testID="product-card" activeOpacity={0.85}
      onPress={() => onSelect(product.id)}
      style={[styles.card, isTile && styles.cardTile]}>
      <View style={styles.imageBox}>
        <Image source={{ uri: product.image }}
          style={isTile ? styles.imageTile : styles.imageRow} resizeMode="cover" />
        {isTile && <Text style={styles.ratingBadge}>⭐ {product.rating.toFixed(1)}</Text>}
      </View>
      <View style={[styles.info, isTile && styles.infoTile]}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        {!isTile && <>
          <Text style={styles.meta}>{product.category}</Text>
          <Text style={styles.price}>{product.price.toLocaleString('vi-VN')} đ</Text>
          <Text style={styles.rating}>⭐ {product.rating.toFixed(1)}</Text>
        </>}
        <Text style={styles.stock}>{product.inStock ? '✅ Còn hàng' : '❌ Hết hàng'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card:{flexDirection:'row',alignItems:'center',backgroundColor:'#fff',borderRadius:12,padding:10,marginBottom:12,elevation:2,shadowColor:'#000',shadowOpacity:0.08,shadowRadius:4,shadowOffset:{width:0,height:2}},
  cardTile:{flexDirection:'column',width:'48%',padding:0,overflow:'hidden',alignItems:'stretch'},
  imageBox:{position:'relative'}, imageRow:{width:70,height:100,borderRadius:8,backgroundColor:'#e5e7eb'},
  imageTile:{width:'100%',aspectRatio:2/3,backgroundColor:'#e5e7eb'},
  ratingBadge:{position:'absolute',top:8,right:8,backgroundColor:'rgba(0,0,0,0.7)',color:'#fff',paddingHorizontal:7,paddingVertical:4,borderRadius:8,fontWeight:'700'},
  info:{flex:1,marginLeft:12,gap:3}, infoTile:{marginLeft:0,padding:10}, name:{fontSize:16,fontWeight:'700',color:'#111827'},
  meta:{color:'#6b7280'}, price:{color:'#1d4ed8',fontWeight:'700'}, rating:{color:'#92400e'}, stock:{marginTop:3,fontWeight:'600'}
});
export default React.memo(ProductCard);
