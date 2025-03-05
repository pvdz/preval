# Preval test case

# primitive_method.md

> Object literal > Static prop lookups > Primitive method
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
const o = {oops: 'fail'};
$(o.oops());
`````

## Pre Normal


`````js filename=intro
const o = { oops: `fail` };
$(o.oops());
`````

## Normalized


`````js filename=intro
const o = { oops: `fail` };
const tmpCalleeParam = o.oops();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
`fail`();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`\`fail\`()\``;
`````

## PST Output

With rename=true

`````js filename=intro
"fail".undefined();
throw "[Preval]: Call expression with illegal callee must crash before this line ; ``fail`()`";
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
