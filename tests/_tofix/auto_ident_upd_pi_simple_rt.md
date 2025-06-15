# Preval test case

# auto_ident_upd_pi_simple_rt.md

> Tofix > auto ident upd pi simple rt

Why does preval not know a is a number here (at the time of writing)?

## Options

- refTest

## Input

`````js filename=intro
let a /*:unknown*/ = undefined;
let tmpClusterSSA_b$2 /*:number*/ = 12;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  tmpClusterSSA_b$2 = tmpClusterSSA_b$2 + 1;
  a = tmpClusterSSA_b$2;
  if (a) {
  } else {
    break;
  }
}
$(a, tmpClusterSSA_b$2);
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___5__*/ a = /*___6__*/ undefined;
let /*___8__*/ tmpClusterSSA_b$2 = 12;
while (/*___11__*/ $LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  /*12~31*/ $(100);
  /*___22__*/ tmpClusterSSA_b$2 = /*___20__*/ tmpClusterSSA_b$2 + 1;
  /*___26__*/ a = /*___25__*/ tmpClusterSSA_b$2;
  if (/*___28__*/ a) {
    /*29~29*/
  } /*30~31*/ else {
    break;
  }
}
$(/*___35__*/ a, /*___36__*/ tmpClusterSSA_b$2);
`````


## Todos triggered


None


## Ref tracking result


                      | reads      | read by     | overWrites     | overwritten by
a:
  - w @5       | ########## | not read    | none           | 26
  - w @26      | ########## | 28,35       | 5,26           | 26
  - r @28      | 26
  - r @35      | 26

tmpClusterSSA_b$2:
  - w @8              | ########## | 20          | none           | 22
  - r @20             | 8,22
  - w @22             | ########## | 20,25,36    | 8,22           | 22
  - r @25             | 22
  - r @36             | 22
