# Preval test case

# call.md

> normalize > new > call
>
> The `new` operator should apply to a single identifier. A literal can also work though it would lead to a runtime error.

#TODO

## Input

`````js filename=intro
$(new ($())(5 + 5, $(), Array.prototype.length));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpNewCallee = $();
const tmpCalleeParam$1 = 5 + 5;
const tmpCalleeParam$2 = $();
const tmpCompObj = Array.prototype;
const tmpCalleeParam$3 = tmpCompObj.length;
const tmpCalleeParam = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$2, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 
 - 2: 
 - eval returned: ('<crash[ <ref> is not a constructor ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
