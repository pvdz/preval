# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Statement > Computed prop prop > Auto pattern arr s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
let obj = {};
obj[($(10), $(20), [1, 2])];
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
let obj = {};
obj[($(10), $(20), [1, 2])];
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let obj = {};
const tmpCompObj = obj;
$(10);
$(20);
const tmpCompProp = [1, 2];
tmpCompObj[tmpCompProp];
$(a);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
const obj = {};
$(10);
$(20);
obj[`1,2`];
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ ... a ];
const c = b[ 0 ];
const d = {};
$( 10 );
$( 20 );
d[ "1,2" ];
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
