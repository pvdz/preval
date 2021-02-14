# Preval test case

# stmt_tdz.md

> normalize > identifier > stmt_tdz
>
> Known ident that will trigger tdz will still be eliminated, for now. Impossible to safely detect but we can improve some cases later.

#TODO

## Input

`````js filename=intro
x;
let x = 10;
$('fail');
`````

## Normalized

`````js filename=intro
let x = 10;
$('fail');
`````

## Output

`````js filename=intro
$('fail');
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: BAD?!
 - 1: 'fail'
 - eval returned: undefined

Final output calls: BAD!!
 - 1: 'fail'
 - eval returned: undefined
