# Preval test case

# ctxt_cmp_opt_a_undef_a.md

> Normalize > Optional > Ctxt cmp opt a undef a
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = undefined;
$($(a)?.[$('b')][$('c')](100));
`````

## Pre Normal


`````js filename=intro
const a = undefined;
$($(a)?.[$(`b`)][$(`c`)](100));
`````

## Normalized


`````js filename=intro
const a = undefined;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`b`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpChainRootComputed$1 = $(`c`);
  const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, undefined, 100);
  tmpCalleeParam = tmpChainElementCall$1;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $(undefined);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`b`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpChainRootComputed$1 /*:unknown*/ = $(`c`);
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementObject, undefined, 100);
  $(tmpChainElementCall$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( undefined );
const b = a == null;
if (b) {
  $( undefined );
}
else {
  const c = $( "b" );
  const d = a[ c ];
  const e = $( "c" );
  const f = d[ e ];
  const g = $dotCall( f, d, undefined, 100 );
  $( g );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
