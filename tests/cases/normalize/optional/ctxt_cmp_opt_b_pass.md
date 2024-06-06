# Preval test case

# ctxt_cmp_opt_b_pass.md

> Normalize > Optional > Ctxt cmp opt b pass
>
> Ensure context is passed on properly in various optional chaining cases

#TODO

## Input

`````js filename=intro
const a = {b: {c: $}};
$($(a)[$('b')]?.[$('c')](100));
`````

## Pre Normal


`````js filename=intro
const a = { b: { c: $ } };
$($(a)[$(`b`)]?.[$(`c`)](100));
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { c: $ };
const a = { b: tmpObjLitVal };
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
const tmpObjLitVal = { c: $ };
const a = { b: tmpObjLitVal };
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
const a = { c: $ };
const b = { b: a };
const c = $( b );
const d = $( "b" );
const e = c[ d ];
const f = e == null;
if (f) {
  $( undefined );
}
else {
  const g = $( "c" );
  const h = e[ g ];
  const i = $dotCall( h, e, 100 );
  $( i );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { b: '{"c":"\\"<$>\\""}' }
 - 2: 'b'
 - 3: 'c'
 - 4: 100
 - 5: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
