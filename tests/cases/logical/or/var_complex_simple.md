# Preval test case

# complex_simple.md

> logical > and > complex_simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = $(1) || 2;
$(x);
`````

## Normalized

`````js filename=intro
let x = $(1);
if (x) {
} else {
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
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
