import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ProductCard, { Product } from '../components/ProductCard';
const product:Product={id:'p01',name:'Tai nghe Bluetooth',category:'Electronics',price:350000,rating:8,image:'https://picsum.photos/200/300',inStock:true};
describe('ProductCard',()=>{
  test('render đúng tên và rating 1 chữ số thập phân',()=>{const {getByText}=render(<ProductCard product={product} onSelect={jest.fn()}/>); expect(getByText('Tai nghe Bluetooth')).toBeTruthy(); expect(getByText('⭐ 8.0')).toBeTruthy();});
  test('row có category, tile không có category',()=>{const row=render(<ProductCard product={product} layout="row" onSelect={jest.fn()}/>); expect(row.getByText('Electronics')).toBeTruthy(); row.unmount(); const tile=render(<ProductCard product={product} layout="tile" onSelect={jest.fn()}/>); expect(tile.queryByText('Electronics')).toBeNull();});
  test('hiển thị đúng trạng thái còn/hết hàng',()=>{const a=render(<ProductCard product={product} onSelect={jest.fn()}/>); expect(a.getByText('✅ Còn hàng')).toBeTruthy(); a.unmount(); const b=render(<ProductCard product={{...product,inStock:false}} onSelect={jest.fn()}/>); expect(b.getByText('❌ Hết hàng')).toBeTruthy();});
  test('press gọi onSelect đúng 1 lần với product.id',()=>{const onSelect=jest.fn(); const {getByTestId}=render(<ProductCard product={product} onSelect={onSelect}/>); fireEvent.press(getByTestId('product-card')); expect(onSelect).toHaveBeenCalledTimes(1); expect(onSelect).toHaveBeenCalledWith('p01');});
});
