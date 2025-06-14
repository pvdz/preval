# Preval test case

# loop_redundant3.md

> Ref tracking > Done > While-if > Loop redundant3
>
> String should be replaced with an empty string (or a custom string indicating they can't be observed)

## Options

- refTest

## Input

`````js filename=intro
{
  let a = "unobservable";
  while ($LOOP_UNROLL_500) {
    a = $;
    if ($) {
      $(a)
    }
  }
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ a = `unobservable`;
while (/*___8__*/ $LOOP_UNROLL_500) {
  /*9~21*/ /*___13__*/ a = $;
  if ($) {
    /*16~20*/ $(/*___20__*/ a);
  } /*21~21*/ else {
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | not read    | none           | 13
  - w @13      | ########## | 20          | 4,13           | 13
  - r @20      | 13
