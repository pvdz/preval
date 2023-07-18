# Preval test case

# ctxt_cmp_opt_c_undef_a.md

> Normalize > Optional > Ctxt cmp opt c undef a
>
> Ensure context is passed on properly in various optional chaining cases

#TODO

## Input

`````js filename=intro
const a = undefined;
$($(a)[$('b')][$('c')]?.(100));
`````

## Pre Normal

`````js filename=intro
const a = undefined;
$($(a)[$(`b`)][$(`c`)]?.(100));
`````

## Normalized

`````js filename=intro
const a = undefined;
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
const tmpChainElementCall = $(undefined);
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
const a = $( undefined );
const b = $( "b" );
const c = a[ b ];
const d = $( "c" );
const e = c[ d ];
const f = e == null;
if (f) {
  $( undefined );
}
else {
  const g = $dotCall( e, c, 100 );
  $( g );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 'b'
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
