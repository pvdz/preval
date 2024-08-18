# Preval test case

# with_ident_non_func.md

> Object literal > Inlining > With ident non func
>
>

## Input

`````js filename=intro
let g = function(){ 
  return 'wat';
}
const obj = {f: g};
$(obj.f());
const tmp = function(){ g = 1; };
$(tmp());
$(obj.f());
`````

## Pre Normal


`````js filename=intro
let g = function () {
  debugger;
  return `wat`;
};
const obj = { f: g };
$(obj.f());
const tmp = function () {
  debugger;
  g = 1;
};
$(tmp());
$(obj.f());
`````

## Normalized


`````js filename=intro
let g = function () {
  debugger;
  return `wat`;
};
const obj = { f: g };
const tmpCallCallee = $;
const tmpCalleeParam = obj.f();
tmpCallCallee(tmpCalleeParam);
const tmp = function () {
  debugger;
  g = 1;
  return undefined;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = tmp();
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = obj.f();
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
$(`wat`);
$(undefined);
$(`wat`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "wat" );
$( undefined );
$( "wat" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'wat'
 - 2: undefined
 - 3: 'wat'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
