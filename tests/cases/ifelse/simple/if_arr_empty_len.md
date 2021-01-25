# Preval test case

# if_arr_empty_len.md

> ifelse > simple > if_arr_empty_len
>
> Eliminate simple tautology

#TODO

## Input

`````js filename=intro
if ([].length) $();
`````

## Normalized

`````js filename=intro
const tmpIfTest = [].length;
if (tmpIfTest) {
  $();
}
`````

## Output

`````js filename=intro
const tmpIfTest = [].length;
if (tmpIfTest) {
  $();
}
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
