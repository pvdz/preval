# Preval test case

# for_of.md

> normalize > blocks > for_of
>
> Add blocks to sub-statements

## Input

`````js filename=intro
for (x of $(1)) $(2);
`````

## Normalized

`````js filename=intro
{
  const tmpForOfRhs = $(1);
  for (x of tmpForOfRhs) {
    $(2);
  }
}
`````

## Output

`````js filename=intro
const tmpForOfRhs = $(1);
for (x of tmpForOfRhs) {
  $(2);
}
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
