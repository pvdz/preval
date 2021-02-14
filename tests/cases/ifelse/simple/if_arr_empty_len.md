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
const tmpCompObj = [];
const tmpIfTest = tmpCompObj.length;
if (tmpIfTest) {
  $();
}
`````

## Output

`````js filename=intro
const tmpCompObj = [];
const tmpIfTest = tmpCompObj.length;
if (tmpIfTest) {
  $();
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
