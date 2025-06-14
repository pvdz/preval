# Preval test case

# loop_boundary2.md

> Ref tracking > Done > While-if > Loop boundary2
>
> If there was a reference after the loop, it must reflect the value of the binding
> after mutations inside the loop. So in that case we can't SSA inside the loop.
> If there aren't any after the loop, then we can only SSA if there were no reads
> before the write. But that gets complicated by conditional branching, like:
>     `let x = 5; while (true) { if (false) x = 6; else $(x); }`
> In this case we see the write-ref before the read-ref, but we obviously can't apply
> SSA inside the loop because it will fail hard. We need more solid write tracking
> for this. As such we currently can't reliably apply SSA cross-loop boundaries.

## Options

- refTest

## Input

`````js filename=intro
let x = 5;
while (true) { 
  if ($(false)) {
    x = 6;
  }
  $(x); // 5 or 6
  if ($) {
    break;
  }
}
$(x); // 5 or 6
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 5;
while (true) {
  /*8~35*/ const /*___11__*/ tmpIfTest = $(false);
  if (/*___16__*/ tmpIfTest) {
    /*17~25*/ /*___21__*/ x = 6;
    $(/*___25__*/ x);
  } /*26~30*/ else {
    $(/*___30__*/ x);
  }
  if ($) {
    /*33~34*/ break;
  } /*35~35*/ else {
  }
}
$(/*___39__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 30,39       | none           | 21
  - w @21      | ########## | 25,30,39    | 4,21           | 21
  - r @25      | 21
  - r @30      | 4,21
  - r @39      | 4,21

tmpIfTest:
  - w @11      | ########## | 16          | none           | none
  - r @16      | 11
