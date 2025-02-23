# Preval test case

# sequence_ident_computed.md

> Normalize > Member access > Statement > Func > Sequence ident computed
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  let b = "foo", c = 1;
  ($(1), b)[$('length')];
  $(c);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let b = `foo`,
    c = 1;
  ($(1), b)[$(`length`)];
  $(c);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = `foo`;
  let c = 1;
  $(1);
  const tmpCompObj = b;
  const tmpCompProp = $(`length`);
  tmpCompObj[tmpCompProp];
  $(c);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
const tmpCompProp /*:unknown*/ = $(`length`);
`foo`[tmpCompProp];
$(1);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( "length" );
"foo"[ a ];
$( 1 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'length'
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
