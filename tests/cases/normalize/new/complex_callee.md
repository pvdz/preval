# Preval test case

# call.md

> normalize > new > call
>
> The `new` operator should apply to a single identifier. A literal can also work though it would lead to a runtime error.

#TODO

## Input

`````js filename=intro
$(new ($()));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpNewCallee = $();
const tmpCalleeParam = new tmpNewCallee();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpNewCallee = $();
const tmpCalleeParam = new tmpNewCallee();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: ('<crash[ <ref> is not a constructor ]>')

Normalized calls: Same

Final output calls: Same
