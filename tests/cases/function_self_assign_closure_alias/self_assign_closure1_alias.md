# Preval test case

# self_assign_closure1_alias.md

> Function self assign closure alias > Self assign closure1 alias
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
// Since b() always returns a fresh reference, `a() !== b()` even though `b() === a()`
$(a() === b());
$(a() === b());
// Swapped, even now, will be equal, since b() updates the reference for a()
$(b() === a());
// But it does so every time so a still not b here
$(a() === b());
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
$(a() === b());
$(a() === b());
$(b() === a());
$(a() === b());
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
const tmpCallCallee = $;
const tmpBinBothLhs = a();
const tmpBinBothRhs = b();
const tmpCalleeParam = tmpBinBothLhs === tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpBinBothLhs$1 = a();
const tmpBinBothRhs$1 = b();
const tmpCalleeParam$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpBinBothLhs$3 = b();
const tmpBinBothRhs$3 = a();
const tmpCalleeParam$3 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$5 = $;
const tmpBinBothLhs$5 = a();
const tmpBinBothRhs$5 = b();
const tmpCalleeParam$5 = tmpBinBothLhs$5 === tmpBinBothRhs$5;
tmpCallCallee$5(tmpCalleeParam$5);
`````

## Output

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
const b = a;
const tmpBinBothLhs = a();
const tmpBinBothRhs = b();
const tmpCalleeParam = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam);
const tmpBinBothLhs$1 = a();
const tmpBinBothRhs$1 = b();
const tmpCalleeParam$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
$(tmpCalleeParam$1);
const tmpBinBothLhs$3 = b();
const tmpBinBothRhs$3 = a();
const tmpCalleeParam$3 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
$(tmpCalleeParam$3);
const tmpBinBothLhs$5 = a();
const tmpBinBothRhs$5 = b();
const tmpCalleeParam$5 = tmpBinBothLhs$5 === tmpBinBothRhs$5;
$(tmpCalleeParam$5);
`````

## PST Output

With rename=true

`````js filename=intro
let a = function() {
  debugger;
  const b = [ 1, 2, 3,, ];
  a = function() {
    debugger;
    return b;
  };
  const c = a();
  return c;
};
const d = a;
const e = a();
const f = d();
const g = e === f;
$( g );
const h = a();
const i = d();
const j = h === i;
$( j );
const k = d();
const l = a();
const m = k === l;
$( m );
const n = a();
const o = d();
const p = n === o;
$( p );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: false
 - 3: true
 - 4: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
