# Preval test case

# dotcall_alias_ok.md

> Object literal > Inlining > Dotcall alias ok
>
>

## Input

`````js filename=intro
const g = function(){ return 'win'; };
const obj = {f: g};
const alias = obj.f;
$($dotCall(alias, obj));
`````

## Pre Normal


`````js filename=intro
const g = function () {
  debugger;
  return `win`;
};
const obj = { f: g };
const alias = obj.f;
$($dotCall(alias, obj));
`````

## Normalized


`````js filename=intro
const g = function () {
  debugger;
  return `win`;
};
const obj = { f: g };
const alias = obj.f;
const tmpCallCallee = $;
const tmpCalleeParam = $dotCall(alias, obj);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`win`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "win" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'win'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
