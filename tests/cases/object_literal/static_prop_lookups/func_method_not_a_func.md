# Preval test case

# func_method_not_a_func.md

> Object literal > Static prop lookups > Func method not a func
>
> If we can statically resolve a property lookup, we should

#TODO

## Input

`````js filename=intro
const arr = [1, 2, 3];
const o = {
  arr,
};
// Should leave it (for now). Although we kinda know this will be a runtime error, anyways.
$(o.arr());
`````

## Pre Normal

`````js filename=intro
const arr = [1, 2, 3];
const o = { arr: arr };
$(o.arr());
`````

## Normalized

`````js filename=intro
const arr = [1, 2, 3];
const o = { arr: arr };
const tmpCallCallee = $;
const tmpCalleeParam = o.arr();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const arr = [1, 2, 3];
const o = { arr: arr };
const tmpCalleeParam = o.arr();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = { arr: a };
const c = b.arr();
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
