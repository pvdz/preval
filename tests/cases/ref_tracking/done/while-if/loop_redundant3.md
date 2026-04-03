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
  while ($LOOP_UNROLLS_LEFT_500) {
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
/* stmt(3): */ let /*___4__*/ a = `unobservable`;
/* stmt(7): */ while (/*___8__*/ $LOOP_UNROLLS_LEFT_500) {
  /*9~21*/ /* stmt(10): */ /*___13__*/ a = $;
  /* stmt(14): */ if ($) {
    /*16~20*/ /* stmt(17): */ $(/*___20__*/ a);
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
