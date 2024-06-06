# Preval test case

# ctxt_cmp_opt_c_undef_c.md

> Normalize > Optional > Ctxt cmp opt c undef c
>
> Ensure context is passed on properly in various optional chaining cases

#TODO

## Input

`````js filename=intro
const a = {b: {}};
$($(a)[$('b')][$('c')]?.(100));
`````

## Pre Normal


`````js filename=intro
const a = { b: {} };
$($(a)[$(`b`)][$(`c`)]?.(100));
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = {};
const a = { b: tmpObjLitVal };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpChainRootComputed = $(`b`);
const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
const tmpChainRootComputed$1 = $(`c`);
const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
const tmpIfTest = tmpChainElementObject$1 != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, 100);
  tmpCalleeParam = tmpChainElementCall$1;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpObjLitVal = {};
const a = { b: tmpObjLitVal };
const tmpChainElementCall = $(a);
const tmpChainRootComputed = $(`b`);
const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
const tmpChainRootComputed$1 = $(`c`);
const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
const tmpIfTest = tmpChainElementObject$1 == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, 100);
  $(tmpChainElementCall$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
const b = { b: a };
const c = $( b );
const d = $( "b" );
const e = c[ d ];
const f = $( "c" );
const g = e[ f ];
const h = g == null;
if (h) {
  $( undefined );
}
else {
  const i = $dotCall( g, e, 100 );
  $( i );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { b: '{}' }
 - 2: 'b'
 - 3: 'c'
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
