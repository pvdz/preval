# Preval test case

# self_assign_closure2.md

> Self assign closure > Self assign closure2
>
> See self_assign_closure rule

## Input

`````js filename=intro
let a = function(){
  const arr = [1,2,3];
  a = function(){ return arr; };
  return a();
}
$(a()[2]);
$(a()[1]);
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
$(a()[2]);
$(a()[1]);
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
const tmpCompObj = a();
const tmpCalleeParam = tmpCompObj[2];
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCompObj$1 = a();
const tmpCalleeParam$1 = tmpCompObj$1[1];
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
$(3);
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 3 );
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
