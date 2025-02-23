# Preval test case

# group_call.md

> Normalize > Member access > Statement > Func > Group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
function f() {
  ($(1), $(2), $($)).length;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  ($(1), $(2), $($)).length;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(1);
  $(2);
  const tmpCompObj = $($);
  tmpCompObj.length;
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
$(2);
const tmpCompObj /*:unknown*/ = $($);
tmpCompObj.length;
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( $ );
a.length;
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: '<$>'
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
