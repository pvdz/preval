# Preval test case

# dotcall_indirect.md

> Const aliasing > Dotcall indirect
>
>

## Input

`````js filename=intro
const g = function(a){ $(a); };
const obj = {f: g};
const method = obj.f;
$(1);
$(2);
$dotCall(method, obj, 10);
`````

## Pre Normal


`````js filename=intro
const g = function ($$0) {
  let a = $$0;
  debugger;
  $(a);
};
const obj = { f: g };
const method = obj.f;
$(1);
$(2);
$dotCall(method, obj, 10);
`````

## Normalized


`````js filename=intro
const g = function ($$0) {
  let a = $$0;
  debugger;
  $(a);
  return undefined;
};
const obj = { f: g };
const method = obj.f;
$(1);
$(2);
$dotCall(method, obj, 10);
`````

## Output


`````js filename=intro
$(1);
$(2);
$(10);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 10 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
