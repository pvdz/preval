# Preval test case

# prop_write_known.md

> Array > Static props > Prop write known
>
> Getting the length of an array can be tricky, and sometimes be done

We could potentially detect the literal write and still support this kind of case. Is that worth it?

If so, we can still assume the arr.length, but we will have to do tracking to assert the actual value of each index.

#TODO

## Input

`````js filename=intro
const arr = [1, 2, 3];
arr[2] = 10;
$(arr.length);
`````

## Pre Normal

`````js filename=intro
const arr = [1, 2, 3];
arr[2] = 10;
$(arr.length);
`````

## Normalized

`````js filename=intro
const arr = [1, 2, 3];
arr[2] = 10;
const tmpCallCallee = $;
const tmpCalleeParam = arr.length;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
