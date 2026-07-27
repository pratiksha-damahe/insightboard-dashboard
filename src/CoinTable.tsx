import type { CryptoData } from './services';

interface Props {
  coins: CryptoData[];
}

function CoinTable({ coins }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="py-2">Coin</th>
            <th className="py-2">Price</th>
            <th className="py-2">24h Change</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id} className="border-b last:border-0">
              <td className="py-3 flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                {coin.name}
              </td>
              <td className="py-3">${coin.current_price.toLocaleString()}</td>
              <td
                className={`py-3 font-medium ${
                  coin.price_change_percentage_24h >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoinTable;