# Preval test case

# sequence_call.md

> Normalize > Member access > Statement > Func > Sequence call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  ($(1), $(2)).toString;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  ($(1), $(2)).toString;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(1);
  const tmpCompObj = $(2);
  tmpCompObj.toString;
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
const tmpCompObj = $(2);
tmpCompObj.toString;
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
a.toString;
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
