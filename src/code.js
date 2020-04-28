var Code = `#include<iostream>
using namespace std;

int main(){

  return 0;
}
`
var defCode = []
var defcode = Code.split("\n")
defcode.map(d =>{
  let x = d.trim()
  defCode.push(x)
})

export default Code