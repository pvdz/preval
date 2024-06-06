# Preval test case

# ctxt_cmp_opt_b_undef_b.md

> Normalize > Optional > Ctxt cmp opt b undef b
>
> Ensure context is passed on properly in various optional chaining cases

#TODO

## Input

`````js filename=intro
const a = {};
$($(a)[$('b')]?.[$('c')](100));
`````

## Pre Normal


`````js filename=intro
const a = {};
$($(a)[$(`b`)]?.[$(`c`)](100));
`````

## Normalized


`````js filename=intro
const a = {};
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpChainRootComputed = $(`b`);
const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpChainRootComputed$1 = $(`c`);
  const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, 100);
  tmpCalleeParam = tmpChainElementCall$1;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const a = {};
const tmpChainElementCall = $(a);
const tmpChainRootComputed = $(`b`);
const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
const tmpIfTest = tmpChainElementObject == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainRootComputed$1 = $(`c`);
  const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, 100);
  $(tmpChainElementCall$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = $( a );
const c = $( "b" );
const d = b[ c ];
const e = d == null;
if (e) {
  $( undefined );
}
else {
  const f = $( "c" );
  const g = d[ f ];
  const h = $dotCall( g, d, 100 );
  $( h );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: 'b'
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
