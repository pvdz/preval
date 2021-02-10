# Preval test case

# simple_simple.md

> logical > and > simple_simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = 1 && 2;
$(x);
`````

## Normalized

`````js filename=intro
let x = 1;
if (x) {
  x = 2;
}
$(x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
