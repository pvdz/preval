# Preval test case

# simple_complex.md

> logical > and > simple_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
1 || $(2);
`````

## Normalized

`````js filename=intro
if (1) {
} else {
  $(2);
}
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same