# Preval test case

# complex_complex.md

> logical > and > complex_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
$(1) || $(2);
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  $(2);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
