# Preval test case

# call.md

> normalize > new > call
>
> An array with complex elements should be normalized to a temp var

## Input

`````js filename=intro
$([5 + 5, $(), Array.prototype.length]);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpArrElement = 10;
const tmpArrElement$1 = $();
const tmpCompObj = Array.prototype;
const tmpArrElement$2 = tmpCompObj.length;
const tmpCalleeParam = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpArrElement$1 = $();
const tmpCompObj = Array.prototype;
const tmpArrElement$2 = tmpCompObj.length;
const tmpCalleeParam = [10, tmpArrElement$1, tmpArrElement$2];
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: [10, undefined, 0]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
