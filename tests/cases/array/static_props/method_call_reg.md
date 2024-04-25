# Preval test case

# method_call_reg.md

> Array > Static props > Method call reg
>
> Getting the length of an array can be tricky, and sometimes be done

We could technically support this kind of thing in a subset of situations. But most of the time we'll just bail.

#TODO

## Input

`````js filename=intro
const arr = [1, 2, 3];
arr.splice(1, 2, 20);
$(arr.length);
`````

## Pre Normal

`````js filename=intro
const arr = [1, 2, 3];
arr.splice(1, 2, 20);
$(arr.length);
`````

## Normalized

`````js filename=intro
const arr = [1, 2, 3];
arr.splice(1, 2, 20);
const tmpCallCallee = $;
const tmpCalleeParam = arr.length;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const arr = [1, 2, 3];
arr.splice(1, 2, 20);
const tmpCalleeParam = arr.length;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
a.splice( 1, 2, 20 );
const b = a.length;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
