# Preval test case

# array_in_array_method.md

> Array > Spread > Array in array method
>
> Spreading an array into another array that is assigned to a binding

#TODO

## Input

`````js filename=intro
const x = [1, 2, 3];
$(x.join('')); // This is benign, but splice would not be
const y = ['a', ...x, 'b'];
$(y);
`````

## Pre Normal

`````js filename=intro
const x = [1, 2, 3];
$(x.join(''));
const y = ['a', ...x, 'b'];
$(y);
`````

## Normalized

`````js filename=intro
const x = [1, 2, 3];
const tmpCallCallee = $;
const tmpCalleeParam = x.join('');
tmpCallCallee(tmpCalleeParam);
const y = ['a', ...x, 'b'];
$(y);
`````

## Output

`````js filename=intro
const x = [1, 2, 3];
const tmpCalleeParam = x.join('');
$(tmpCalleeParam);
const y = ['a', ...x, 'b'];
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '123'
 - 2: ['a', 1, 2, 3, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same