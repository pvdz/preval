# Preval test case

# self_assign_closure1.md

> Self assign closure > Self assign closure1
>
> See self_assign_closure rule

## Input

`````js filename=intro
let a = function(){
  const arr = [1,2,3];
  a = function(){ return arr; };
  return a();
}
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
const tmpCallCallee = $;
const tmpBinBothLhs = a();
const tmpBinBothRhs = a();
const tmpCalleeParam = tmpBinBothLhs === tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const a = [1, 2, 3];
const tmpCalleeParam = a === a;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3,, ];
const b = a === a;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
