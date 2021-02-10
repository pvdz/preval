# Preval test case

# call_stmt.md

> normalize > sequence > call_stmt
>
> Expression statement that is a call with callee that is a sequence

#TODO

## Input

`````js filename=intro
($(), Date)();
`````

## Normalized

`````js filename=intro
$();
const tmpCallCallee = Date;
tmpCallCallee();
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
