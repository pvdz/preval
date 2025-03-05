# Preval test case

# self_assign_closure2_alias.md

> Function self assign closure alias > Self assign closure2 alias
>
> See self_assign_closure rule
> This is the case where the function is also aliased

## Input

`````js filename=intro
let a = function(){
  const arr = [1,2,3];
  a = function(){ return arr; };
  return a();
}
let b = a;
// When b is called first, the reference will be the same
$(b() === a());
$(b() === a());
// But calling b() will keep creating fresh references itself
$(b() === b());
// But it won't change a's closure
$(b() === a());
$(a() === a());
`````

## Pre Normal


`````js filename=intro
let a = function () {
  debugger;
  const arr = [1, 2, 3];
  a = function () {
    debugger;
    return arr;
  };
  return a();
};
let b = a;
$(b() === a());
$(b() === a());
$(b() === b());
$(b() === a());
$(a() === a());
`````

## Normalized


`````js filename=intro
let a = function () {
  debugger;
  const arr = [1, 2, 3];
  a = function () {
    debugger;
    return arr;
  };
  const tmpReturnArg = a();
  return tmpReturnArg;
};
let b = a;
const tmpBinBothLhs = b();
const tmpBinBothRhs = a();
const tmpCalleeParam = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam);
const tmpBinBothLhs$1 = b();
const tmpBinBothRhs$1 = a();
const tmpCalleeParam$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
$(tmpCalleeParam$1);
const tmpBinBothLhs$3 = b();
const tmpBinBothRhs$3 = b();
const tmpCalleeParam$3 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
$(tmpCalleeParam$3);
const tmpBinBothLhs$5 = b();
const tmpBinBothRhs$5 = a();
const tmpCalleeParam$5 = tmpBinBothLhs$5 === tmpBinBothRhs$5;
$(tmpCalleeParam$5);
const tmpBinBothLhs$7 = a();
const tmpBinBothRhs$7 = a();
const tmpCalleeParam$7 = tmpBinBothLhs$7 === tmpBinBothRhs$7;
$(tmpCalleeParam$7);
`````

## Output


`````js filename=intro
let a /*:()=>unknown*/ = function () {
  debugger;
  const arr /*:array*/ = [1, 2, 3];
  a = function () {
    debugger;
    return arr;
  };
  const tmpReturnArg /*:unknown*/ = a();
  return tmpReturnArg;
};
const b /*:unknown*/ = a;
const tmpBinBothLhs /*:unknown*/ = a();
const tmpBinBothRhs /*:unknown*/ = a();
const tmpCalleeParam /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam);
const tmpBinBothLhs$1 /*:unknown*/ = b();
const tmpBinBothRhs$1 /*:unknown*/ = a();
const tmpCalleeParam$1 /*:boolean*/ = tmpBinBothLhs$1 === tmpBinBothRhs$1;
$(tmpCalleeParam$1);
const tmpBinBothLhs$3 /*:unknown*/ = b();
const tmpBinBothRhs$3 /*:unknown*/ = b();
const tmpCalleeParam$3 /*:boolean*/ = tmpBinBothLhs$3 === tmpBinBothRhs$3;
$(tmpCalleeParam$3);
const tmpBinBothLhs$5 /*:unknown*/ = b();
const tmpBinBothRhs$5 /*:unknown*/ = a();
const tmpCalleeParam$5 /*:boolean*/ = tmpBinBothLhs$5 === tmpBinBothRhs$5;
$(tmpCalleeParam$5);
const tmpBinBothLhs$7 /*:unknown*/ = a();
const tmpBinBothRhs$7 /*:unknown*/ = a();
const tmpCalleeParam$7 /*:boolean*/ = tmpBinBothLhs$7 === tmpBinBothRhs$7;
$(tmpCalleeParam$7);
`````

## PST Output

With rename=true

`````js filename=intro
let a = function() {
  debugger;
  const b = [ 1, 2, 3 ];
  a = function() {
    debugger;
    return b;
  };
  const c = a();
  return c;
};
const d = a;
const e = a();
const f = a();
const g = e === f;
$( g );
const h = d();
const i = a();
const j = h === i;
$( j );
const k = d();
const l = d();
const m = k === l;
$( m );
const n = d();
const o = a();
const p = n === o;
$( p );
const q = a();
const r = a();
const s = q === r;
$( s );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true
 - 3: false
 - 4: true
 - 5: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
